import React from "react";
import axios from "axios";
import { Col, Container, Form, Row, Button, Card, Modal, } from "react-bootstrap";
import store from "../../app/store";
import { addCart } from "../../features/keranjang/cartSlice"; 
import { uangRupiah } from "./currency";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      menu: [],
      dataMenu: {},
      show: false,
      popupUid: null,
      popupNama: null,
      popupKategori: null,
      popupHarga: null,
      searchCategory: '',
      searchName: ''
    };
  }

  async callAPI() {
    try {
      await axios.get("http://localhost:8000/menu").then((res) => {
        this.setState({ dataMenu: res.data.menu });
        this.setState({ menu: Object.keys(res.data.menu) });
        this.setState({ loading: false });
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Terjadi kesalahan server. Silahkan refresh kembali!");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert(error.response.data.status);
        document.location.reload();
      }
    }
  }

  handleAddCart() {
    store.dispatch(addCart(this.state.popupUid));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <>
      { this.state.loading? <h1 id="content" className="text-center p-5 pt-5">LOADING</h1> :
      <>
        <Container className="my-5">
          <Row className="flex-column-reverse flex-md-row mb-4 mx-2">
            <Col md={4} className="p-2">
              <Form.Select
                className="border-primary"
                style={{ width: "35%" }}
                onChange={(data) => {
                  this.setState({searchCategory: data.target.value});
                }}
              >
                <option value="">All </option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
              </Form.Select>
            </Col>
            <Col md={{ span: 5, offset: 3 }} className="p-2">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    this.setState({searchName: e.target.value});
                  }}
                />
                <Button variant="btn btn-primary">Search</Button>
              </Form>
            </Col>
          </Row>

          <Row>
            {this.state.dataMenu !== null ? (
              this.state.menu.filter(
                // eslint-disable-next-line
                (val) => {
                  if (this.state.searchName === "" && this.state.searchCategory === "") {
                    return val;
                  } else if (this.state.dataMenu[val].nama.toLowerCase().includes(this.state.searchName.toLowerCase())) {
                    if (this.state.dataMenu[val].jenis.toLowerCase().includes(this.state.searchCategory.toLowerCase())) {
                      return val;
                    }
                  }
                }
              ).map((e, i) => {
                return (
                  <Col className="my-1 col-6" xl={3} md={4} sm={6} key={i}>
                    <div
                      className="btn"
                      onClick={() => {
                        this.setState({
                          popupUid: e,
                          popupNama: this.state.dataMenu[e].nama,
                          popupKategori: this.state.dataMenu[e].jenis,
                          popupHarga: this.state.dataMenu[e].harga,
                          show: true
                        });
                      }}
                    >
                      <Card className="shadow-sm">
                        <Card.Img
                          variant="top"
                          src={this.state.dataMenu[e].ref}
                          width={150}
                          height={150}
                        />
                        <Card.Body className="text-center">
                          <Card.Title>{this.state.dataMenu[e].nama}</Card.Title>
                          <Card.Text>
                            {uangRupiah(this.state.dataMenu[e].harga)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col></Col>
            )}
          </Row>

          <Modal
            show={this.state.show}
            onHide={() => {
              this.setState({ show: false });
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body> Nama Menu : {this.state.popupNama} </Modal.Body>
            <Modal.Body> Kategori  : {String(this.state.popupKategori).toUpperCase()} </Modal.Body>
            <Modal.Body> Harga     : {uangRupiah(this.state.popupHarga)} </Modal.Body>
            <Modal.Footer>
              <Button
                variant="btn btn-primary"
                onClick={
                  () => {
                    this.handleAddCart();
                    this.setState({ show: false });
                  }
                }
              >Tambah</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  this.setState({ show: false });
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
      }
      </>
    );
  }
}

export default Home;
