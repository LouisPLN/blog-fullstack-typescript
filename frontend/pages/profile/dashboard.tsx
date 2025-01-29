import AppButton from "@/components/Button/AppButton";
import ToggleFormsButton from "@/components/Button/ToggleFormsButton";
import withAuth from "@/utils/withAuth";

const dashboard = () => {
  return (
    <div><ToggleFormsButton optionLeft="Formulaire Projet" optionRight="Formulaire Post"></ToggleFormsButton></div>
  )
}

export default withAuth(dashboard);