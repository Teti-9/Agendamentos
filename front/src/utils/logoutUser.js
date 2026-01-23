export default function logoutUser(setPage) {
    localStorage.removeItem('token')
    alert('Logout efetuado com sucesso!')
    setPage(0)
}