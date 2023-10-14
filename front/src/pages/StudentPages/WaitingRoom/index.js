import React from "react";
import BaseAuth from "../../../components/BaseAuth";
import Dog from "../../../components/animation/DogWaiting/Dog";
import { useNavigate, useParams } from "react-router-dom";

const WaitingRoom = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(`/cliniccasewater/${pin}`);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [pin]);

  return (
    <BaseAuth>
      <div className="titlewaitingDiv">
        <Dog />
        <h3>Aguardando o professor liberar a sala de experimento...</h3>
      </div>
    </BaseAuth>
  );
};
export default WaitingRoom;
