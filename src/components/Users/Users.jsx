import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";

const Users = (props) => {
    return <div>
            <Paginator onPageChanged={props.onPageChanged}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       totalItemsCount={props.totalUsersCount}
            />
       <div>
        {
        props.users.map(u => <User u={u}
                                   key={u.id}
                             unfollowUsersCreator={props.unfollowUsersCreator}
                             followingInProgress={props.followingInProgress}
                             followUsersCreator={props.followUsersCreator}/>)
        }
       </div>
    </div>
}


export default Users;