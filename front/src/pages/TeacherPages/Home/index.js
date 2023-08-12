import React from "react";
import Base from "../../../components/BaseLayout";
import { MdOutlineDashboard } from "react-icons/md";
import { Table, Button, Card, Input, Space, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  findExperiments,
  deleteExperiment,
} from "../../../services/routes/api/Experiment";
import { BsTrash, BsEye } from "react-icons/bs";
import Swal from "sweetalert2";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils/formats";
import moment from "moment";

const Home = () => {
  const navigate = useNavigate();
  const response = JSON.parse(localStorage.getItem("responseUser"));
  const [experiments, setExperiments] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [filteredExperiments, setFilteredExperiments] = React.useState([]);

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
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
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

  const handleSearch = () => {
    const filteredByTitle = experiments.filter((experiment) =>
      experiment.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredByDateAndTitle = selectedDate
      ? filteredByTitle.filter((experiment) => {
          const createdAtDate = moment(experiment.createdAt);
          return createdAtDate.isSame(selectedDate, "day");
        })
      : filteredByTitle;

    setFilteredExperiments(filteredByDateAndTitle);
  };

  React.useEffect(() => {
    fetchExperiments();
    handleSearch();
  }, [fetchExperiments, selectedDate, searchText]);

  const atualDateinPortuguese = new Date().toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
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
            <Card className="page-card-home">
              <div>
                <h3 className="title-card-home">
                  Tabela de todos os experimentos
                </h3>
              </div>
              <div className="divInputsSearch">
                <Input
                  placeholder="Pesquisar"
                  className="inputSearch"
                  prefix={<SearchOutlined className="iconSearch" />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onPressEnter={() => handleSearch()}
                />
                <DatePicker
                  placeholder={atualDateinPortuguese}
                  className="inputSearch"
                  onChange={(date) => {
                    setSelectedDate(date);
                    handleSearch();
                  }}
                />
              </div>
              <div className="table-home">
                <Table
                  columns={columns}
                  dataSource={filteredExperiments}
                  rowKey="_id"
                  style={{ width: "100%" }}
                />
              </div>
            </Card>
          </div>
        }
      />
    </>
  );
};

export default Home;
