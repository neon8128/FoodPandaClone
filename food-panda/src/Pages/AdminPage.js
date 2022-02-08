import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "../App.css";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div class="container-admin">
  <div class="vertical-center-admin">

    <Stack direction="row" spacing={2}>
    <Button variant="contained" onClick={() =>navigate("/Orders")}>Received Orders</Button>
    <Button variant="contained" onClick={() =>navigate("/myrestaurant")}>My Menu</Button>
  </Stack>
  </div>
</div>
  );
};

export default AdminPage;
