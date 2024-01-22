export const reqDate=()=>{
const today = new Date();
today.setDate(today.getDate() - 30);
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
const day = today.getDate().toString().padStart(2, '0');
const date=`${year}-${month}-${day}`
return date;
}

