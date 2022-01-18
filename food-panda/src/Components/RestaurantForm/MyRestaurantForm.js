
import CardComponent from "../Card/CardComponent";
import CardList from "../Card/CardList";
import Box from '@material-ui/core/Box';

export const MyRestaurantForm = (props) =>{
    console.log(props);
    return (
        <Box p={10}>
            
        <CardComponent {...props.restaurant}/>
        </Box>
    );
}
export default MyRestaurantForm;