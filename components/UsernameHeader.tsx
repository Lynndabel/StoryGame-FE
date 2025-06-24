const Username = ({username, wallet}: {username: string, wallet: string}) => {
 return <div className="capitalize bg-[#26220826] rounded-lg p-2  flex items-center justify-center">{wallet}<button className="text-[#1A1203] rounded-lg  px-4 py-2 bg-yellow">{username}</button></div>
}
export default Username