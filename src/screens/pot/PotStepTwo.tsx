import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  detect_figure,
  InputDatum,
  Movement,
} from "../../motionrecog/motion_recognition";
import { Subscription } from "expo-sensors/build/Pedometer";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { ImageScreen } from '../../components/ImageScreen'

export function PotStepTwo() {
  const { navigate } = useNavigation<UseNavigation<"PotStepTwo">>();

  const motionData = useRef<InputDatum[]>([]);
  const i = useRef<number>(0);

  const listenerRef = useRef<Subscription[]>([]);

  const handler = useCallback((data: DeviceMotionMeasurement) => {
    if (data.acceleration) {
      const datum = {
        ax: data.acceleration.x,
        ay: data.acceleration.y,
        az: data.acceleration.z,
        timestamp: data.interval,
      };

      motionData.current.push(datum);
      i.current += 1;
      if (motionData.current.length > 500) {
        motionData.current.shift();
      }
    }
    if (i.current % 20 == 0) {
      i.current = 0;
      let res = detect_figure(motionData.current);
      for (const movement of res) {
        if (movement == Movement.circle) {
          if (listenerRef.current.length > 0) {
            listenerRef.current[0].remove();
          }
          navigate("PotStepThree");
        }
      }
    }
  }, []);

  let [started, setStarted] = useState(false);

  useEffect(() => {
    let a = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setStarted(true);
    };
    a();
  });

  useEffect(() => {
    if (started) {
      DeviceMotion.setUpdateInterval(1);
      const listener = DeviceMotion.addListener(handler);
      listenerRef.current.push(listener);
      return () => listener.remove();
    }
  }, [started, handler]);

  useEffect(() => {
    (async () => {
      const response = await DeviceMotion.requestPermissionsAsync();
      if (!response.granted) {
        console.warn("Device motion permission not granted");
      }
    })();
  }, []);

  return (
    <ImageScreen
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/pot_step_2.png')}
    />
  )
}
