let apiUrl =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'// si nous somme en local utiliser port :3000 sinon git.heroku.com/app-orinoco.git
    : 'https://git.heroku.com/app-orinoco.git'
    //condition avec opérateur ternaire ? et : 