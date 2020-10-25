import React from "react";
import { createOrphanage } from "../../services/OrphanageService";
import SidebarComponent from "../../components/Sidebar";
import FormCreateComponent from "./components/FormCreate";
import './styles.css';
import OrphanageForm from "../../models/OrphanageForm";

export default function CreateOrphanagePage() {
  
  function handleCreateOrphanage(orphanage:OrphanageForm) {
    createOrphanage(orphanage);
  }

  return (
    <div id="create-orphanage-page-container">
      <SidebarComponent />
      <main>
        <FormCreateComponent 
          createOrphanage={handleCreateOrphanage}
        />
      </main>
    </div>
  );
}