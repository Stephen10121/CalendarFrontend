import { POST_SERVER } from "./variables";

export type PendingGroupsType = {
    groupId: string;
    groupName: string;
}

export interface GoogleLoginData {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  email: string;
  googId: string;
  firstName: string;
  lastName: string;
  name: string;
  groups: string;
  pendingGroups: string;
  locale: string;
  picture: string;
  verifiedEmail: string;
}

export type GroupsType = {
    groupId: string;
    groupName: string;
    groupOwner: string;
    othersCanAdd: boolean;
    youOwn: boolean;
    notification?: boolean;
}

export interface FetchGroupsResponse {
    error: string;
    data?: {
        groups: GroupsType[];
        pendingGroups: PendingGroupsType[];
    };
}

export async function fetchGroups(token: string): Promise<FetchGroupsResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/myGroups`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit"
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
          return {error: groupsJson.error}
      }
      return { error: "", data: { groups: groupsJson.groups, pendingGroups: groupsJson.pendingGroups} }
    } catch (err) {
      console.error(err);
      return {error: "Failed to fetch Groups."};
    }
}

export interface ValidateResponse {
  error: boolean;
  data?: {
      userData: GoogleLoginData;
  };
}

export async function validate(token: string): Promise<ValidateResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/validate`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit"
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: true}
      }
      return {error: false, data: groupsJson.data}
    } catch (err) {
      console.error(err);
      return {error: true};
    }
}

export async function addNotification(token: string, notificationToken: string): Promise<ValidateResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/addNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
          "token": notificationToken
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: true}
      }
      return {error: false}
    } catch (err) {
      console.error(err);
      return {error: true};
    }
}

export interface Particapant {
  name: string;
  id: number;
}

export interface GroupInfoData {
  about_group: string;
  created: string;
  group_id: string;
  name: string;
  owner: string;
  owner_email: string;
  particapants: Particapant[];
  yourowner?: {
    ownerId: number;
    pending_particapants: Particapant[];
  }
}

export interface GroupInfoResponse {
error: string;
data?: GroupInfoData;
}

export async function groupInfo(groupId: string, token: string): Promise<GroupInfoResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/groupInfo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "groupId": groupId,
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", data: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Getting Group Data."};
    }
}

interface ParticapantResponse {
  message?: string;
  error?: string;
}

interface AcceptParticapantResponse extends ParticapantResponse {}

export async function acceptParticapant(groupId: string, token: string, particapant: string): Promise<AcceptParticapantResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/acceptUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "id": groupId,
            "particapant": particapant
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", message: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Accepting Particapant."};
    }
}

interface AcceptParticapantResponse extends ParticapantResponse {}

export async function declineParticapant(groupId: string, token: string, particapant: string): Promise<AcceptParticapantResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/rejectUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "id": groupId,
            "particapant": particapant
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", message: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Rejecting Particapant."};
    }
}

interface RemoveParticapantResponse extends ParticapantResponse {}

export async function removeParticapant(groupId: string, token: string, particapant: string): Promise<RemoveParticapantResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/kickUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "id": groupId,
            "particapant": particapant
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", message: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Deleting Particapant."};
    }
}

export interface GoogleLoginProps {
  error?: string,
  data?: {
    userData: GoogleLoginData,
    token: string
  }
}

export async function googleLoginOrRegister(accessToken: string): Promise<GoogleLoginProps> {
  try {
    const groups = await fetch(`${POST_SERVER}/google`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "omit",
      body: JSON.stringify({"token": accessToken})
    })
    
    const groupsJson = await groups.json();
    
    if (groupsJson.error !== "" || !groupsJson.data) {
      return { error: "Error logging in user." }
    }

    return { data: { userData: groupsJson.data.userData, token: groupsJson.data.token} }
  } catch (err) {
    return { error: "Error logging in user." }
  }
}

export interface JoinGroupResponse {
  error: string;
  message?: string;
  groupName?: string;
}

export async function joinGroup(groupId: string, password: string, token: string): Promise<JoinGroupResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/joinGroup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "id": groupId,
          "password": password
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", message: groupsJson.message, groupName: groupsJson.groupName}
  } catch (err) {
    console.error(err);
    return {error: "Error Joining Group."};
  }
}

interface CreateGroupResponse {
  error?: string;
  data?: GroupsType;
}

export async function createGroup(groupId: string, groupName: string, password: string, othersCanAdd: boolean, about_group: string, token: string): Promise<CreateGroupResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/createGroup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "name": groupName,
          "id": groupId,
          "password": password,
          "othersCanAdd": othersCanAdd,
          "aboutGroup": about_group
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", data: groupsJson.data}
  } catch (err) {
    console.error(err);
    return {error: "Error Joining Group."};
  }
}

interface LeaveGroupResponse extends ParticapantResponse {}

export async function leaveGroup(groupId: string, token: string, transfer: number): Promise<LeaveGroupResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/leaveGroup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "id": groupId,
          "transfer": transfer.toString()
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", message: groupsJson.message}
  } catch (err) {
    console.error(err);
    return {error: "Error leaving Group."};
  }
}

interface DeleteGroupResponse extends ParticapantResponse {}

export async function deleteGroup(groupId: string, token: string): Promise<DeleteGroupResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/deleteGroup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "id": groupId,
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", message: groupsJson.message}
  } catch (err) {
    console.error(err);
    return {error: "Error deleting Group."};
  }
}

interface CancelRequestResponse extends ParticapantResponse {}

export async function cancelRequest(groupId: string, token: string): Promise<CancelRequestResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/cancelRequest`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "id": groupId,
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", message: groupsJson.message}
  } catch (err) {
    console.error(err);
    return {error: "Error leaving Group."};
  }
}