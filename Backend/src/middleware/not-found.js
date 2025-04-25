import { StatusCodes } from "http-status-codes";

const notFound=(req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json("Route does not exist")
}

export default notFound;