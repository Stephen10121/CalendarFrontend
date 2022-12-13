import { useDispatch } from "react-redux";
import { ReduxState } from "../redux/reducers";
const dispatch = useDispatch();

export function removePendingGroup(pendingGroups: ReduxState["pendingGroups"], groupId: string) {
    let newGroups = [];
    for (let i=0;i<pendingGroups.length;i++){
        if (pendingGroups[i].groupId !== groupId) {
            newGroups.push(pendingGroups[i]);
        }
    }
    dispatch({ type: "SET_USER_PENDING_GROUPS", payload: newGroups });
}

export function removeGroup(groups: ReduxState["groups"], groupId: string) {
    let newGroups = [];
    for (let i=0;i<groups.length;i++){
        if (groups[i].groupId !== groupId) {
            newGroups.push(groups[i]);
        }
    }
    dispatch({ type: "SET_USER_GROUPS", payload: newGroups });
}