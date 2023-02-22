export default function getJobState(volunteers: string, volunteersNeeded: number) {
    const volunteersJson = JSON.parse(volunteers);
    if (Array.isArray(volunteersJson)) {
        let positions = 0;
        for (let i=0;i<volunteersJson.length;i++) {
            //@ts-ignore
            positions+=volunteersJson[i].positions;
        }
        if (positions === volunteersNeeded) {
            return("taken");
        }
        return("almost");
    } else {
        return("available");
    }
}