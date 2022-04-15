const API_LINK = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(start = 0, limit = 10) {

    const response = await fetch(`${API_LINK}?_start=${start}&_limit=${limit}`);
    return await response.json();
}