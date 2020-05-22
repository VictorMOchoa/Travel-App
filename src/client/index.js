import { handleSubmit, returnHome } from './js/formHandler'
import './styles/style.scss'

document.getElementById('submit-btn').addEventListener('click', handleSubmit);
document.getElementById('return-btn').addEventListener('click', returnHome);

export {
  handleSubmit, returnHome
}
