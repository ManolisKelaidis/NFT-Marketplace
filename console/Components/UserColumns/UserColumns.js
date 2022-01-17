
import React from "react"
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap"

const UserColumns = () => [
  {
    dataField: "id",
    text: "#",
    formatter: (cellContent, row) => (
      <div className="form-check font-size-16">
        <Input type="checkbox" className="form-check-input" id={row.id} />
        <Label className="form-check-label" htmlFor={row.id}>
          &nbsp;
        </Label>
      </div>
    ),
  },
  {"dataField":"username","text":"username","sort":true},{"dataField":"email","text":"email","sort":true},{"dataField":"firstName","text":"firstName","sort":true},{"dataField":"lastName","text":"lastName","sort":true},{"dataField":"description","text":"description","sort":true},{"dataField":"password","text":"password","sort":true},{"dataField":"facebookId","text":"facebookId","sort":true},{"dataField":"instagramId","text":"instagramId","sort":true},{"dataField":"twitterId","text":"twitterId","sort":true},{"dataField":"mysiteId","text":"mysiteId","sort":true},{"dataField":"followers","text":"followers","sort":true},{"dataField":"profilePic","text":"profilePic","sort":true},{"dataField":"totalEtherium","text":"totalEtherium","sort":true},{"dataField":"type","text":"type","sort":true}
  ,{
    dataField: "menu",
    isDummyField: true,
    text: "Action",
    formatter: () => (
      <UncontrolledDropdown direction="left">
        <DropdownToggle href="#" className="card-drop" tag="i">
          <i className="mdi mdi-dots-horizontal font-size-18" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem href="#">
            <i className="fas fa-pencil-alt text-success me-1" />
            Edit
          </DropdownItem>
          <DropdownItem href="#">
            <i className="fas fa-trash-alt text-danger me-1" />
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]

export default UserColumns
