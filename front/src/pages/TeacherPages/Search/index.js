import React, { useState } from "react";
import Base from "../../../components/BaseLayout";
import { MdOutlineBiotech } from "react-icons/md";
import { Card, Row, Col, Tag, Checkbox } from "antd";
import "./styles.css";
import Announcement from "./components/Announcement";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";
import { postExperiment } from "../../../services/routes/api/Experiment";

const Search = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [description, setDescription] = useState("");

  const idTeacher = localStorage.getItem("_idTeacher");

  const handleSearch = () => {
    if (!searchName) {
      Alert.fire({
        icon: "error",
        title: "Insira um titulo no experimento!",
      });
    } else if (!description) {
      Alert.fire({
        icon: "error",
        title: "Insira uma descrição no experimento!",
      });
    } else {
      try {
        const body = {
          title: searchName,
          description: description,
        };

        postExperiment(idTeacher, body).then((response) => {
          Alert.fire({
            icon: "success",
            title: "Experimento criado com sucesso!",
          }).finally(() => {
            navigate(
              `/experimentroom/${response.data.experiment._id}/${response.data.experiment.pin}`
            );
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Base
      goTo={"/search"}
      Icon={<MdOutlineBiotech />}
      goToName={"Novo experimento"}
      titlepage={"ao novo experimento, "}
      nameofuser={"Fernanda Bonfim"}
      children={
        <>
          <Row>
            <Col xs={24} xl={24}>
              <Card className="card-forms">
                <h4 className="center forms-title">
                  Vamos iniciar mais uma pesquisa?
                </h4>
                <span className="center forms-description">
                  Preencha o formulário abaixo para realizar a sua novo
                  experimento
                </span>
                <span className="start label-input-forms">
                  Título da pesquisa:
                </span>
                <input
                  id="search-name"
                  name="search-name"
                  className="start input-forms"
                  placeholder="Ex: Variação de água corporal"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <textarea
                  id="search-name"
                  name="search-name"
                  className="start input-forms"
                  placeholder="Ex: Variação de água corporal"
                  maxLength={300}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => handleSearch()}
                    className="center btn-save"
                  >
                    Salvar novo experimento
                  </button>
                </div>
                <Announcement />
              </Card>
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default Search;
