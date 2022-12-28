import { useDispatch } from "react-redux";
import { setUserGroups, setUserPendingGroups } from "../redux/actions";
import { Store } from "../redux/types";
const dispatch = useDispatch();

export function removePendingGroup(pendingGroups: Store["pendingGroups"], groupId: string) {
    let newGroups = [];
    for (let i=0;i<pendingGroups.length;i++){
        if (pendingGroups[i].groupId !== groupId) {
            newGroups.push(pendingGroups[i]);
        }
    }
    dispatch(setUserPendingGroups(newGroups));
}

export function removeGroup(groups: Store["groups"], groupId: string) {
    let newGroups = [];
    for (let i=0;i<groups.length;i++){
        if (groups[i].groupId !== groupId) {
            newGroups.push(groups[i]);
        }
    }
    dispatch(setUserGroups(newGroups));
}