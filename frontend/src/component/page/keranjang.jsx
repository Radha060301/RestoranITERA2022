import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { uangRupiah } from "./currency";

const Keranjang = () => {
  var currCart = JSON.parse(localStorage.getItem('cart')).data;
  return (
    <Container className="mt-5">
      <Row>
        <h4 className="mb-4">Keranjang</h4>

        {/* Input Name */}
        <Row className="py-4 px-5 border border-1 shadow-sm mx-3 mb-3">
          <h5 className="mb-2">Nama Pemesan</h5>
          <InputGroup size="lg">
            <Form.Control
              placeholder="Tuliskan Nama Anda..."
              aria-label="nama"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: "#E9E9E9" }}
            />
          </InputGroup>
        </Row>

        {/* Detail */}
        {currCart.map((e, i) => { return(
        <Row className="border border-1 shadow-sm mx-3 p-3 mb-3">
          <Col className="p-2 d-flex justify-content-center">
            <img
              src="https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg"
              alt=""
              width={150}
            />
          </Col>
          <Col className="p-2 d-flex flex-column align-items-center justify-content-center">
            <h5>{e.nama}</h5>
            <h6>{uangRupiah(e.harga)} /porsi</h6>
          </Col>
          <Col className="p-2 d-flex align-items-center justify-content-center">
            <Button variant="outline-primary">
              <AiOutlineMinus style={{ fontSize: 22 }} />
            </Button>
            <h5 className="mx-4">1</h5>
            <Button variant="outline-primary">
              <AiOutlinePlus style={{ fontSize: 22 }} />
            </Button>
          </Col>
          <Col className="p-2 d-flex align-items-center justify-content-center">
            <h5>{uangRupiah(e.harga)}</h5>
          </Col>
          <Col className="p-2 d-flex justify-content-center align-items-center">
            <Button variant="outline-danger">
              <BsFillTrashFill style={{ fontSize: 22 }} />
            </Button>
          </Col>
        </Row>
        );
        })}

        {/* Total */}
        <Row className="border border-1 shadow-sm mx-3 p-3">
          <Col className="d-flex justify-content-center align-items-center">
            <Form.Select className="w-75 border-primary">
              <option>Pilih Meja</option>
              {[...Array(10)].map((x, i) => (
                <option>Meja {i + 1}</option>
              ))}
            </Form.Select>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            {" "}
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h5>Total</h5>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h5>Rp. 3.000</h5>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Button>Pesan Sekarang</Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Keranjang;
