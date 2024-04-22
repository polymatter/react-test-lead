import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container'
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import FormControl from "react-bootstrap/FormControl"
import Feedback from "react-bootstrap/esm/Feedback";

/**
 * This adapter allows react-bootstrap components to be used in Server Components
 * 
 * See https://stackoverflow.com/questions/75261466/unsupported-server-component-type-undefined-next-js-13
 */

export { Container, Navbar, NavbarBrand, Button, Form, FormControl, Row, Col, InputGroup, InputGroupText, Table, Feedback }
