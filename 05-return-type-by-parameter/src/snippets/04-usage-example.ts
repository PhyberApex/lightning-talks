export async function get<
    Endpoint extends keyof ResponseJsonByEndpoint
>(
    endpoint: Endpoint | `${Endpoint}?${string}`
): Promise<ResponseJsonByEndpoint[Endpoint]> {
    const response = await fetch(`/api${endpoint}`);
    return await response.json();
}

type ResponseJsonByEndpoint = {
    '/user': User;
    '/users': User[];
    '/task': Task;
    '/tasks': Task[];
}

const users = await get('/users');
const limitedUsers = await get('/users?limit=10');
const task = await get('/task');