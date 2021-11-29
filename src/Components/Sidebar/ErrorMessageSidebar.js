import {BsCloudSlashFill} from "react-icons/bs";

export default function ErrorMessageSidebar()
{
    return( 
    <div>
        <div  className='no-weather'><BsCloudSlashFill className='no-weather-icon'/></div>
        <div className='oops'>Oops! </div>
        <div className='err-msg'>Please select a location!</div>
    </div>)
}