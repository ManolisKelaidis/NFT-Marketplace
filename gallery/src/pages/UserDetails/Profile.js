import React, { useMemo } from "react";
import {
  TabContainer,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "react-bootstrap";
import CollectionList from "./CollectionList";
import WalletList from "./WalletList";
import OnSaleList from "./OnSaleList";
import CreatedList from "./CreatedList";
import ProfileSettings from "./ProfileSettings";
import ActivityList from "./ActivityList";
import ProfilePasswordForm from "./ProfilePasswordForm";
import { useSelector } from "react-redux";
import { useTabSelector } from "./provider";
import NotificationList from "./NotificationList";
import Notification from "../../components/notifications/Notifications";
// const defaultTabKey = "tab-1";

const Profile = ({ currentUserId }) => {
  const { userId } = useSelector((state) => state.auth);
  var notifications = true;
  const { activeTabKey, setActiveTabKey } = useTabSelector();

  const tabList = useMemo(() => {
    setActiveTabKey("tab-1");

    const list = [
      { key: "tab-1", label: "Wallet", component: WalletList },
      { key: "tab-2", label: "Created", component: CreatedList },
      { key: "tab-3", label: "On sale", component: OnSaleList },
      { key: "tab-4", label: "Collections", component: CollectionList },
    ];

    if (currentUserId === userId)
      return [
        ...list,
        ...[
          { key: "tab-5", label: "Notifications", component: NotificationList },
          { key: "tab-7", label: "My Activity", component: ActivityList },
          { key: "tab-6", label: "Settings", component: ProfileSettings },
          {
            key: "tab-8",
            label: "Change Password",
            component: ProfilePasswordForm,
          },
        ],
      ];

    return list;
  }, [currentUserId, userId]);

  const renderComponent = (Component) => <Component activeTab={activeTabKey} />;

  return (
    <TabContainer
      activeKey={activeTabKey}
      mountOnEnter
      onSelect={setActiveTabKey}
    >
      <div className="profile">
        <Nav as="ul" className="nav-tabs profile__tabs border-bottom-0">
          {tabList.map((tab, index) => (
            <NavItem as="li" key={index}>
              {notifications && tab.label === "Notifications" ? (
                <div>
                  <NavLink className="p-0 mb-0 " eventKey={tab.key}>
                    {tab.label}
                    <Notification  notificationsNumber={5}></Notification>
                  </NavLink>
                  
                </div>
              ) : (
                <NavLink className="p-0 mb-0" eventKey={tab.key}>
                  {tab.label}
                </NavLink>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>

      <TabContent>
        {tabList.map((tab, index) => (
          <TabPane key={index} eventKey={tab.key}>
            {renderComponent(tab.component)}
          </TabPane>
        ))}
      </TabContent>
    </TabContainer>
  );
};

export default Profile;
