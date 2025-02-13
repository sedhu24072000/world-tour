import Button from "./button"
import { useNavigate } from "react-router-dom";

function BackButton(){
    const navigate = useNavigate()
    return(
        <Button type='back' onclick={(e) => {
            e.preventDefault()
            navigate(-1)
            }}>&larr; Back
        </Button>
    )
}

export default BackButton