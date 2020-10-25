import React from 'react';
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import pointMapperIcon from '../../assets/icon-point-mapper.svg';
import './styles.css';

const SidebarComponent: React.FC<{}> = () => {
  const { goBack } = useHistory();
  return(
    <aside id="sidebar-container">
      <img src={pointMapperIcon} alt="Happy" />
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default SidebarComponent;