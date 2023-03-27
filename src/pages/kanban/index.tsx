import { useState } from "react";

import LateralMenu from "../../components/lateral-menu";
import { TABS } from "../../enums";
import styles from "./index.module.css";
import { Tabs } from "../../types";
import BoardSection from "./tabs/boards/index";
import { IoConstruct } from "react-icons/io5";
import colors from "../../colors";

function KanbanPage() {
  const [currentTab, setCurrentTab] = useState<Tabs>(TABS.BOARDS);
  const renderCurrentTab = () => {
    switch (currentTab) {
      case TABS.BOARDS:
        return <BoardSection />;
      case TABS.TEAMS:
        return (
          <div className={styles.soon}>
            <h1>Em Breve!</h1>
            <IoConstruct size={96} color={colors.darkBrown} />
          </div>
        );
      case TABS.REPORTS:
        return (
          <div className={styles.soon}>
            <h1>Em Breve!</h1>
            <IoConstruct size={96} color={colors.darkBrown} />
          </div>
        );
      case TABS.SETTINGS:
        return (
          <div className={styles.soon}>
            <h1>Em Breve!</h1>
            <IoConstruct size={96} color={colors.darkBrown} />
          </div>
        );
    }
  };

  const handleTabChange = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  return (
    <div className={styles.page}>
      <LateralMenu currentTab={currentTab} onTabChange={handleTabChange} />
      <main className={styles.mainSection}>{renderCurrentTab()}</main>
    </div>
  );
}

export default KanbanPage;
