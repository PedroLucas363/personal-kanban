import {
  IoTabletPortrait,
  IoPeople,
  IoDocumentText,
  IoCog,
} from "react-icons/io5";

import Button from "../button";

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
      <svg
        className={styles.logo}
        width="166"
        height="195"
        viewBox="0 0 166 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id={styles.signature}
          d="M4.95678 4.94806C15.7248 6.76452 31.0401 8.97904 42.7172 11.0042C61.5585 14.2717 80.6786 16.2689 99.6611 18.5098C109.137 19.6283 130.101 21.2652 139.637 21.6077L90.0129 50.2907L23.1658 86.9339M23.1658 86.9339C22.486 80.8447 23.8199 14.0903 23.9376 7.96668M23.1658 86.9339C23.882 93.3487 18.5819 190.079 18.5819 190.079L30.3365 159.583L47.9152 124.336L59.3077 102.793L75.6345 75.0748L82.4096 61.9594L87.6424 51.5901L161.38 103.702L64.2484 94.4048M62.3344 97.6542C97.5 114.5 90.0129 152 87.6424 162C85.272 172 75.6345 194.5 120 190.079"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

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
