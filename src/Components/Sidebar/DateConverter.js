export default function DateConverter(props)
{
    function timeConverter(time)
    {
      let date = new Date(time);
      let month = date.getMonth();
      let dt = date.getDate();
      let week= date.getDay();
  
      let weekdays = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
      let months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
      
      if (dt < 10) {
        dt = '0' + dt;
      }
      return(weekdays[week]+', '+dt+" "+months[month]);
    }
  
    return <div> Today&emsp;.&emsp;{timeConverter(props.value)} </div>
}