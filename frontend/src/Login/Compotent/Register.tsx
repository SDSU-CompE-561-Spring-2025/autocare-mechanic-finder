'use cilent'

const register = () => {
    return (
    <><div className="background">
    <div className="logo"></div>
</div>
<form>
    <h3>Register!</h3>

    <label for="username"> Username</label>
    <input type="text" placeholder="Email" id="username" />

    <label for="password"> Password</label>
    <input type="password" placeholder="Password" id="password" />
    <button>Dign up</button>
    <h4>Login</h4>
</form></>
    );
} 
export default register;