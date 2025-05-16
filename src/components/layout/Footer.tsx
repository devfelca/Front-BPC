
const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Observatório BPC. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
