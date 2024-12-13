
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Alert, Badge, Button, ButtonGroup, ButtonToolbar, Card, CardBody, CardSubtitle, CardText, CardTitle, UncontrolledAlert, Breadcrumb, BreadcrumbItem, ListGroupItem, ListGroup, OffcanvasBody, Offcanvas, OffcanvasHeader, Nav, NavItem, Pagination, PaginationItem, PaginationLink, Placeholder, CardImg, PlaceholderButton, PopoverBody, PopoverHeader, Popover } from 'reactstrap';
import React, { useState } from 'react';
import { Modal, ModalHeader,  ModalBody, ModalFooter } from 'reactstrap';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';



export default function Category() {
  return (

  <div>
    <br/><br/><br/>
      <div>Category</div>
      <Badge color="dark">
        Dark
      </Badge><br/><br/><br/>
      <Alert color="dark">
        This is a primary alert — check it out!
      </Alert><br/><br/><br/>
      <Alert color="info">
        This is a primary alert with{' '}
        <a
          className="alert-link"
          href="https://example.com"
          rel="noreferrer"
          target="_blank"
        >
          an example link
        </a>
        . Give it a click if you like.
      </Alert><br/><br/><br/>
      <UncontrolledAlert color="info">
        I am an alert and I can be dismissed!
      </UncontrolledAlert>
      <br/><br/><br/>
      <ButtonToolbar>
        <ButtonGroup className="me-2">
          <Button color="primary">
            1
          </Button>
          <Button color="primary">
            2
          </Button>
          <Button color="primary">
            3
          </Button>
          <Button color="primary">
            4
          </Button>
        </ButtonGroup>
        </ButtonToolbar><br/><br/><br/>
        <Card
          style={{
            width: '18rem'
          }}
        >
          <img
            alt="Sample"
            src="https://picsum.photos/300/200"
          />
          <CardBody>
            <CardTitle tag="h5">
              Card title
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Card subtitle
            </CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the bulk of the card‘s content.
            </CardText>
            <Button>
              Button
            </Button>
          </CardBody>
        </Card>

        <br/><br/><br/>
        <Breadcrumb>
    <BreadcrumbItem active>
      Home
    </BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb>
    <BreadcrumbItem>
      <a href="#">
        Home
      </a>
    </BreadcrumbItem>
    <BreadcrumbItem active>
      Library
    </BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb>
    <BreadcrumbItem>
      <a href="#">
        Home
      </a>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <a href="#">
        Library
      </a>
    </BreadcrumbItem>
    <BreadcrumbItem active>
      Data
    </BreadcrumbItem>
  </Breadcrumb>
  <br/><br/><br/>
  <Button
    color="primary"
    outline
  >
    primary
  </Button>
  <br/><br/><br/>
  <ButtonGroup vertical>
  <Button color="danger">
    Button
  </Button>
  <Button color="warning">
    Button
  </Button>
  <Button color="success">
    Button
  </Button>
</ButtonGroup>
<br/><br/><br/>

<div>
  <h3>
    Links{' '}
  </h3>
  <p>
    Be sure to{' '}
    <strong>
      not use the standard{' '}
      <code>
        .btn
      </code>
      {' '}classes here
    </strong>
    .
  </p>
  <ListGroup>
    <ListGroupItem
      action
      active
      href="#"
      tag="a"
    >
      Cras justo odio
    </ListGroupItem>
    <ListGroupItem
      action
      href="#"
      tag="a"
    >
      Dapibus ac facilisis in
    </ListGroupItem>
    <ListGroupItem
      action
      href="#"
      tag="a"
    >
      Morbi leo risus
    </ListGroupItem>
    <ListGroupItem
      action
      href="#"
      tag="a"
    >
      Porta ac consectetur ac
    </ListGroupItem>
    <ListGroupItem
      action
      disabled
      href="#"
      tag="a"
    >
      Vestibulum at eros
    </ListGroupItem>
  </ListGroup>
  <p />
  <h3>
    Buttons{' '}
  </h3>
  <ListGroup>
    <ListGroupItem
      action
      active
      tag="button"
    >
      Cras justo odio
    </ListGroupItem>
    <ListGroupItem
      action
      tag="button"
    >
      Dapibus ac facilisis in
    </ListGroupItem>
    <ListGroupItem
      action
      tag="button"
    >
      Morbi leo risus
    </ListGroupItem>
    <ListGroupItem
      action
      tag="button"
    >
      Porta ac consectetur ac
    </ListGroupItem>
    <ListGroupItem
      action
      disabled
      tag="button"
    >
      Vestibulum at eros
    </ListGroupItem>
  </ListGroup>
</div>

<br/><br/><br/>

<Nav
>
  <NavItem>
    <NavLink
      active
      href="#"
    >
      Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">
      Another Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      disabled
      href="#"
    >
      Disabled Link
    </NavLink>
  </NavItem>
</Nav>

<br/><br/><br/>

<Pagination>
  <PaginationItem>
    <PaginationLink
      first
      href="#"
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      previous
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      1
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      2
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      3
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      4
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      5
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      next
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      last
    />
  </PaginationItem>
</Pagination>
<br/><br/><br/>

<Pagination
  aria-label="Page navigation example"
  size="lg"
>
  <PaginationItem>
    <PaginationLink
      first
      href="#"
    >
      First
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      previous
    >
      Previous
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      1
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      2
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      3
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      next
    >
      Next
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      last
    >
      Last
    </PaginationLink>
  </PaginationItem>
</Pagination>


<br/><br/><br/>


<Card
  style={{
    width: '18rem'
  }}
>
  <CardImg
    alt="Card image cap"
    src="https://picsum.photos/id/135/318/180?grayscale&blur=10"
    top
    width="100%"
  />
  <CardBody>
    <Placeholder
      animation="wave"
      tag={function noRefCheck(){}}
    >
      <Placeholder xs={8} />
    </Placeholder>
    <Placeholder
      animation="wave"
      tag={function noRefCheck(){}}
    >
      <Placeholder xs={12} />
      <Placeholder xs={7} />
    </Placeholder>
    <PlaceholderButton xs={8} />
  </CardBody>
</Card>

<br/><br/><br/>



        </div>



      )
}


// function ModalExample(props) {
//     const [modal, setModal] = useState(false);
//     const [nestedModal, setNestedModal] = useState(false);
//     const [closeAll, setCloseAll] = useState(false);
  
//     const toggle = () => setModal(!modal);
//     const toggleNested = () => {
//       setNestedModal(!nestedModal);
//       setCloseAll(false);
//     };
//     const toggleAll = () => {
//       setNestedModal(!nestedModal);
//       setCloseAll(true);
//     };
  
//     return (
//       <div>
//         <Button color="danger" onClick={toggle}>
//           Click Me
//         </Button>
//         <Modal isOpen={modal} toggle={toggle}>
//           <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//           <ModalBody>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//             <br />
//             <Button color="success" onClick={toggleNested}>
//               Show Nested Modal
//             </Button>
//             <Modal
//               isOpen={nestedModal}
//               toggle={toggleNested}
//               onClosed={closeAll ? toggle : undefined}
//             >
//               <ModalHeader>Nested Modal title</ModalHeader>
//               <ModalBody>Stuff and things</ModalBody>
//               <ModalFooter>
//                 <Button color="primary" onClick={toggleNested}>
//                   Done
//                 </Button>{' '}
//                 <Button color="secondary" onClick={toggleAll}>
//                   All Done
//                 </Button>
//               </ModalFooter>
//             </Modal>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={toggle}>
//               Do Something
//             </Button>{' '}
//             <Button color="secondary" onClick={toggle}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>

//  <div>
//   <Button
//     color="primary"
//     onClick={function noRefCheck(){}}
//   >
//     Open
//   </Button>
//   <Offcanvas toggle={function noRefCheck(){}}>
//     <OffcanvasHeader toggle={function noRefCheck(){}}>
//       Offcanvas
//     </OffcanvasHeader>
//     <OffcanvasBody>
//       <strong>
//         This is the Offcanvas body.
//       </strong>
//     </OffcanvasBody>
//   </Offcanvas>
// </div> 
//  <br/> 

{/* <div>
  <Button
    id="Popover1"
    type="button"
  >
    Launch Popover
  </Button>
  <Popover
    flip
    target="Popover1"
    toggle={function noRefCheck(){}}
  >
    <PopoverHeader>
      Popover Title
    </PopoverHeader>
    <PopoverBody>
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    </PopoverBody>
  </Popover>
</div> */}
//     );
//   }
  
//   export default ModalExample;





// function Example(args) {
//     const [modal, setModal] = useState(false);
  
//     const toggle = () => setModal(!modal);
  
//     return (
//       <div>
//         <Button color="danger" onClick={toggle}>
//           Click Me
//         </Button>
//         <Modal isOpen={modal} toggle={toggle} {...args}>
//           <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//           <ModalBody>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={toggle}>
//               Do Something
//             </Button>{' '}
//             <Button color="secondary" onClick={toggle}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
  
//   export default Example;




// function Example(args) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <React.StrictMode>
//       <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
//         Toggle
//       </Button>
//       <Collapse isOpen={isOpen} {...args}>
//         <Card>
//           <CardBody>
//             Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
//             terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
//             labore wes anderson cred nesciunt sapiente ea proident.
//           </CardBody>
//         </Card>
//       </Collapse>
//     </React.StrictMode>
//   );
// }

// export default Example;










// function Example(props) {
//   const [open, setOpen] = useState('1');
//   const toggle = (id) => {
//     if (open === id) {
//       setOpen();
//     } else {
//       setOpen(id);
//     }
//   };

//   return (
//     <div>
//       <Accordion open={open} toggle={toggle}>
//         <AccordionItem>
//           <AccordionHeader targetId="1">Accordion Item 1</AccordionHeader>
//           <AccordionBody accordionId="1">
//             <strong>This is the first item&#39;s accordion body.</strong>
//             You can modify any of this with custom CSS or overriding our default
//             variables. It&#39;s also worth noting that just about any HTML can
//             go within the <code>.accordion-body</code>, though the transition
//             does limit overflow.
//           </AccordionBody>
//         </AccordionItem>
//         <AccordionItem>
//           <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
//           <AccordionBody accordionId="2">
//             <strong>This is the second item&#39;s accordion body.</strong>
//             You can modify any of this with custom CSS or overriding our default
//             variables. It&#39;s also worth noting that just about any HTML can
//             go within the <code>.accordion-body</code>, though the transition
//             does limit overflow.
//           </AccordionBody>
//         </AccordionItem>
//         <AccordionItem>
//           <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
//           <AccordionBody accordionId="3">
//             <strong>This is the third item&#39;s accordion body.</strong>
//             You can modify any of this with custom CSS or overriding our default
//             variables. It&#39;s also worth noting that just about any HTML can
//             go within the <code>.accordion-body</code>, though the transition
//             does limit overflow.
//           </AccordionBody>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }

// export default Example;