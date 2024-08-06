export function processResponse(response: "yes" | "no") {
    if (response === "yes") {
        // Process "yes"
    } else if (response === "no") {
        // Process "no"
    } else {
        // This else block is unreachable
        const unreachable: never = response;
        console.log("We should never get here!", unreachable);
    }
}