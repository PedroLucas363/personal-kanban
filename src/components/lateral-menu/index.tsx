import {
  IoTabletPortrait,
  IoPeople,
  IoDocumentText,
  IoCog,
} from "react-icons/io5";

import Button from "../button";
import Logo from "../../assets/logo.png";

import styles from "./index.module.css";
import colors from "../../colors";
import { Tabs } from "../../types";
import { TABS } from "../../enums";

type Props = {
  currentTab: Tabs;
  onTabChange: (tab: Tabs) => void;
};

function LateralMenu({ currentTab, onTabChange }: Props) {
  const getOptionColor = (tab: Tabs) => {
    return tab === currentTab ? colors.white : colors.lightPurple;
  };

  return (
    <section className={styles.container}>
      <img src={Logo} alt="imagem do logo" className={styles.logo} />
      <div className={styles.optionsContainer}>
        <Button
          text="Boards"
          icon={
            <IoTabletPortrait color={getOptionColor(TABS.BOARDS)} size="100%" />
          }
          variant="text"
          size="normal"
          iconPosition="left"
          className={styles.option}
          style={{ color: getOptionColor(TABS.BOARDS) }}
          onClick={() => {
            onTabChange(TABS.BOARDS);
          }}
        />
        <Button
          text="Equipes"
          icon={<IoPeople color={getOptionColor(TABS.TEAMS)} size="100%" />}
          variant="text"
          size="normal"
          iconPosition="left"
          className={styles.option}
          style={{ color: getOptionColor(TABS.TEAMS) }}
          onClick={() => {
            onTabChange(TABS.TEAMS);
          }}
        />
        <Button
          text="Relatórios"
          icon={
            <IoDocumentText color={getOptionColor(TABS.REPORTS)} size="100%" />
          }
          variant="text"
          size="normal"
          iconPosition="left"
          className={styles.option}
          style={{ color: getOptionColor(TABS.REPORTS) }}
          onClick={() => {
            onTabChange(TABS.REPORTS);
          }}
        />
        <Button
          text="Ajustes"
          icon={<IoCog color={getOptionColor(TABS.SETTINGS)} size="100%" />}
          variant="text"
          size="normal"
          iconPosition="left"
          className={styles.option}
          style={{ color: getOptionColor(TABS.SETTINGS) }}
          onClick={() => {
            onTabChange(TABS.SETTINGS);
          }}
        />
      </div>
    </section>
  );
}

export default LateralMenu;
