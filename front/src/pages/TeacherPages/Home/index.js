import React from "react";
import Base from "../../../components/BaseLayout";
import { MdOutlineDashboard } from "react-icons/md";
import { Table, Button, Card } from "antd";
import {
  findExperiments,
  deleteExperiment,
} from "../../../services/routes/api/Experiment";
import { BsTrash, BsEye, BsFileEarmarkExcel } from "react-icons/bs";
import Swal from "sweetalert2";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "components/PieChart";

const Home = () => {
  const navigate = useNavigate();
  const response = JSON.parse(localStorage.getItem("responseUser"));
  const [experiments, setExperiments] = React.useState([]);
  const idTeacher = localStorage.getItem("_idTeacher");

  const fetchExperiments = React.useCallback(async () => {
    try {
      await findExperiments(idTeacher).then((response) => {
        setExperiments(response.data.experiments);
        return response.data.experiments;
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Tem certeza que deseja deletar este experimento?",
        text: "Essa ação não pode ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteExperiment(id).then((response) => {
            Swal.fire({
              icon: "success",
              title: "Experimento deletado com sucesso!",
            }).then(() => {
              fetchExperiments();
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "PIN",
      dataIndex: "pin",
      key: "pin",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="style-buttons-table">
          <Button
            className="btn-home-table"
            onClick={() => navigate(`/experimentdetails/${record._id}`)}
          >
            <BsEye />
          </Button>
          <Button
            danger
            className="btn-home-table"
            onClick={() => handleDelete(record._id)}
          >
            <BsTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    { name: "Experiments", value: 10 },
    { name: "Students", value: 50 },
  ];

  return (
    <>
      <Base
        goTo={"/dashboard"}
        Icon={<MdOutlineDashboard />}
        goToName={"Dashboard"}
        titlepage={"à Dashboard,"}
        nameofuser={response?.name}
        children={
          <div className="CardsDiv">
            <Card className="page-card-home bigger">
              <div>
                <h3 className="title-card-home">
                  Tabela de todos os experimentos
                </h3>
              </div>
              <div className="table-home">
                <Table
                  columns={columns}
                  dataSource={experiments}
                  rowKey="_id"
                  style={{ width: "100%" }}
                />
              </div>
            </Card>
            <Card className="page-card-home small">
              <div>
                <h3 className="title-card-home">
                  Gráfico da quantidade de todos os experimentos
                  realizados e alunos que participaram
                </h3>
              </div>
              <PieChartComponent data={data} />
            </Card>
          </div>
        }
      />
    </>
  );
};

export default Home;
