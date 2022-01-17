import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DropdownBasic = ({ items, defaultValue = "price", onChange }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      as="select"
      bsPrefix="c__none"
      className="filter__select"
      onChange={onChange}
    >
      {items.map((item, index) => {
        return (
          <Dropdown.Item
            as="option"
            bsPrefix="c__none"
            key={index}
            value={item.value}
          >
            {t(item.name)}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default DropdownBasic;
