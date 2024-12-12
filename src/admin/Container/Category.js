
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Collapse, Alert, Badge, Button, ButtonGroup, ButtonToolbar, Card, CardBody, CardSubtitle, CardText, CardTitle, UncontrolledAlert } from 'reactstrap';
// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionBody,
//   AccordionHeader,
//   AccordionItem,
// } from 'reactstrap';



// export default function Category() {
//   return (
//   <div>
//     <br/><br/><br/>
//       <div>Category</div>
//       <Badge color="dark">
//         Dark
//       </Badge><br/><br/><br/>
//       <Alert color="dark">
//         This is a primary alert — check it out!
//       </Alert><br/><br/><br/>
//       <Alert color="info">
//         This is a primary alert with{' '}
//         <a
//           className="alert-link"
//           href="https://example.com"
//           rel="noreferrer"
//           target="_blank"
//         >
//           an example link
//         </a>
//         . Give it a click if you like.
//       </Alert><br/><br/><br/>
//       <UncontrolledAlert color="info">
//         I am an alert and I can be dismissed!
//       </UncontrolledAlert>
//       <br/><br/><br/>
//       <ButtonToolbar>
//         <ButtonGroup className="me-2">
//           <Button color="primary">
//             1
//           </Button>
//           <Button color="primary">
//             2
//           </Button>
//           <Button color="primary">
//             3
//           </Button>
//           <Button color="primary">
//             4
//           </Button>
//         </ButtonGroup>
//         </ButtonToolbar><br/><br/><br/>
//         <Card
//           style={{
//             width: '18rem'
//           }}
//         >
//           <img
//             alt="Sample"
//             src="https://picsum.photos/300/200"
//           />
//           <CardBody>
//             <CardTitle tag="h5">
//               Card title
//             </CardTitle>
//             <CardSubtitle
//               className="mb-2 text-muted"
//               tag="h6"
//             >
//               Card subtitle
//             </CardSubtitle>
//             <CardText>
//               Some quick example text to build on the card title and make up the bulk of the card‘s content.
//             </CardText>
//             <Button>
//               Button
//             </Button>
//           </CardBody>
//         </Card>
//         </div>
//       )
// }








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