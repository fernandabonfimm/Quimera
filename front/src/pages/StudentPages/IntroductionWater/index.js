import React from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import Base from "components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import { Row, Col, Card, Button } from "antd";
import {BsBook} from "react-icons/bs";
import { AiOutlineExperiment } from "react-icons/ai";

const IntroductionWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToClinicCase = () => {
    navigate(`/cliniccasewater/${pin}`);
  };
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Introdução a Matéria"}
      titlepage={`a introdução da matéria de queda de água corporal do experimento: ${pin}, `}
      nameofuser={storedName}
      children={
        <Card className="cardCCWater">
          <div className="divTextsintro">
            <h1 className="titlesCCWater">ÁGUA para “QUIMERA”</h1>
            <span className="expCCWater">
              A manutenção de parâmetros, com limites bem determinados, é uma
              característica fundamental para a possibilidade de vida. Um dos
              mais relevantes desses parâmetros é o controle de ÁGUA no
              organismo dos animais, sendo outros exemplos: Na+, Ca++,
              Temperatura, Concentrações Hormonais, Glicose, etc. <br />O volume
              de água total de um animal mantém-se relativamente constante ao
              longo do dia. Sendo que ganho e perda (diários, naturais) de água
              variam continuamente dentro desses limites anteriormente citados.
            </span>
            <h1 className="titlesCCWater">Especificando-se para: </h1>
            <ul className="itemsCCWater">
              <li>
                <strong>GANHO:</strong> A ingestão de água em estado líquido +
                água presente nos alimentos + água oriunda do metabolismo
                celular.
              </li>
              <li>
                <strong>PERDA:</strong> Ocorre na forma de Urina + Sudorese +
                Respiração + Fezes + Leite.
              </li>
            </ul>
            <span className="expCCWater">
              Tanto o ganho como a perda de água do organismo animal são
              contínuos, com episódios mais significativos e outros menos, por
              exemplo: ao urinar o animal elimina quantidade significativa de
              água pontualmente, por outro lado a perda via respiração não é
              pontual, ao invés, ocorre continuamente, variando segundo vários
              fatores ambientais. O ganho ocorre da mesma forma, com ingestão de
              água in natura em quantidade significativa pontualmente, e a
              metabólica não tão pontual.
            </span>
            <br />
            <br />
            <span className="expCCWater">
              Quando a perda alcança níveis significativos mecanismos para a
              ingestão são desencadeados, justamente pela sensação de sede,
              porém outros mecanismos concomitantes também serão promovidos, por
              exemplo, com a concentração de urina sendo acentuada, portanto
              diminuindo o volume de água eliminado. Essa situação será contínua
              para qualquer animal, com o desafio da DESIDRATAÇÃO ameaçando a
              vida permanentemente.
            </span>
            <br />
            <br />
            <span className="expCCWater">
              Assim que a desidratação tem início o animal irá procurar água
              para beber, isso varia em função de vários aspectos, como:
              espécie, estado fisiológico desse indivíduo, idade, temperatura e
              umidade ambiente, etc. <br />
              <br />
              <strong>Outro ponto importante</strong>, relacionado com a perda
              de água, é a alteração dos eletrólitos persentes no organismo
              animal, porém esse tema será motivo para outra atividade. Os
              mecanismos referentes ao controle dos eletrólitos possuem íntima
              relação com o controle de água.
            </span>
          </div>
          <div className="divButtonIntro">
            <h1 className="titleIntro">
              Deseja estudar o caso clínico antes de iniciar ou pular para o
              experimento?
            </h1>
            <div className="divButtonsIntro">
              <Button
                className="btnIntro Yellow"
                type="primary"
                onClick={navigateToClinicCase}
              >
                <BsBook/>
                Estudar caso clínico
              </Button>
              <span className="titleIntro"> Ou </span>
              <Button
                className="btnIntro Orange"
                type="primary"
                onClick={navigateToExperiment}
              >
                <AiOutlineExperiment/>
                Iniciar o experimento
              </Button>
            </div>
          </div>
        </Card>
      }
    />
  );
};
export default IntroductionWater;
