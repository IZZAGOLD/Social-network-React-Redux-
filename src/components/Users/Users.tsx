import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";
import { UserType} from "../../Redux/users-reducer";


type Props = {
    totalUsersCount: number,
    pageSize: number,
    currentPage:number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>
    unfollowUsersCreator: (id:number) => void,
    followUsersCreator: (id:number) => void
}

const Users: React.FC<Props> = (props) => {
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