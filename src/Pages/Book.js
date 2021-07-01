import React from 'react'
import { useState, useEffect } from 'react'
import books from "../components/json/books.json"
import genres from "../components/json/genres.json"
import { Card , Col, Row, Input, Button, Modal, Form, Select, Descriptions} from 'antd';

import {
  DeleteFilled
} from '@ant-design/icons';

import '../CSS/Book.css';

const Book = () => {
  const [booksData,setBooksData] = useState(books);
  const [visible,setVisible] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false);
  const { TextArea, Search } = Input;
  const { Option } = Select;
  const [filteredData, setFilteredData] = useState(books);

  const deleteBook = (book) => {
    // console.log(book.isbn);
    setBooksData(booksData.filter((el) => el.isbn !== book.isbn));
    setFilteredData(booksData.filter((el) => el.isbn !== book.isbn));
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const addBook = (values) => {
    console.log('Success:', values);
    setBooksData([...booksData, values]);
    setFilteredData([...booksData, values]);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onType = (value)=> {
    handleSearch(value.target.value);
  }


  const handleSearch = (target) => {
    if(target ===""){
      setFilteredData(booksData);
      return;
    }
    let value = target.toLowerCase();
    let result = [];
    console.log(value);
    result = booksData.filter((data) => {
      let tempValue = data.title.toLowerCase();
      return tempValue.search(value) !== -1;
    });
    console.log(result);
    setFilteredData(result);
  }



  return (
    <div className = "container">
      <div className = "subContainer">
        <div className = "des" title="Book List" >
          <div className = "title" > Book List </div>
          <Row>
            <Col className = "info" span={24}>
              Number of books added: {booksData.length}
            </Col>
          </Row>
        </div>
        <Button className ="addBtn" type="primary" onClick={showModal} > <div className ="addBtnText" >Add New Book</div> </Button>
        <Search className ="searchBar" placeholder="Search Book's Title" onSearch={handleSearch} onChange = {onType} enterButton />
      </div>

      <Modal
        title="Add Book!"
        visible={visible}
        onCancel={handleCancel}
        footer={[]}>
      <Form
        name="bookForm"
        labelCol={{ span: 6}}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={addBook}
        onFinishFailed={onFinishFailed}>

        <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Book\'s Genre is required!' }]}>
        <Select
          placeholder="Select a Book's Genre"
          allowClear>
          {genres.map((genre,index) => (
            <Option key={index} value={genre.genre}>{genre.genre}</Option>
          ))}
        </Select>
        </Form.Item>

        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: 'Book\'s ISBN is required!' }]}>
        <Input placeholder = "Book's ISBN"/>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Book\'s Title is required!' }]}>
        <Input placeholder = "Book's Title"/>
        </Form.Item>

        <Form.Item
          label="Summary"
          name="summary">
        <TextArea  placeholder = "Book's Summary" rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
          <Button key="back" onClick={handleCancel} className = "returnBtn">
            Return
          </Button>
          <Button type="primary" htmlType="submit" loading = {confirmLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Modal>

      <Row className = "list">
        {filteredData.map((book,index) => (
          <Col key = {index} span={24}>
            <Card title={book.title} extra={ <Button className="deleteBtn" onClick={()=>deleteBook(book)} shape="circle" danger icon={<DeleteFilled style={{ color: '#FFFFFF' }} />} />} className = "book" >
              <p>Genre : {book.genre} </p>
              <p>Isbn : {book.isbn} </p>
              {/* <p>Summary : {book.summary} </p> */}
            </Card>
          </Col>
        ))}
      </Row>


    </div>
  )
}

export default Book
