import { useState, useEffect } from 'react';
import './App.css';
import Jumpscare from './components/Jumpscare';
import SpiderWalking from './components/SpiderWalking';

function App() {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [currentDate, setCurrentDate] = useState('');
  const [location, setLocation] = useState({ lat: 0, lon: 0, timezone: '' });
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [showSpider, setShowSpider] = useState(false);

  useEffect(() => {
    // Atualizar relógio a cada segundo
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('pt-BR');
      const date = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateClock(); // Chamada inicial
    const interval = setInterval(updateClock, 1000);

    // Obter localização
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            timezone: timezone
          });
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-4 animate-pulse">
          🕷️ SPIDER-MAN CLOCK 🕷️
        </h1>
        <p className="text-gray-400 text-lg">Your friendly neighborhood timekeeper</p>
      </div>

      {/* Relógio Principal */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-red-950 shadow-2xl border-4 border-red-600 rounded-lg p-12 max-w-4xl w-full hover:border-red-500 transition-all">
        <div className="text-center">
          {/* Hora */}
          <div className="text-7xl md:text-9xl font-mono font-bold text-red-600 tracking-wider mb-4">
            {currentTime}
          </div>

          {/* Data */}
          <div className="text-2xl md:text-3xl text-gray-300 capitalize mb-8">
            {currentDate}
          </div>

          {/* Localização */}
          {location.timezone && (
            <div className="border-t-2 border-red-800 pt-6">
              <div className="text-gray-400 text-sm mb-2">📍 Fuso Horário</div>
              <div className="text-2xl text-red-500 font-bold mb-4">{location.timezone}</div>
              
              {location.lat !== 0 && (
                <div className="text-gray-400 text-sm">
                  Coordenadas: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </div>
              )}
            </div>
          )}

          {/* Frase do Homem-Aranha */}
          <div className="mt-8 p-4 bg-black bg-opacity-50 rounded-lg border border-red-600">
            <p className="text-lg text-red-400 italic">
              "Com grandes poderes vêm grandes responsabilidades... e pontualidade!"
            </p>
            <p className="text-sm text-gray-500 mt-2">- Tio Ben</p>
          </div>
        </div>
      </div>

      {/* Cards Informativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full">
        <div className="bg-gray-800 shadow-xl border-2 border-red-700 rounded-lg p-6 text-center hover:border-red-500 transition-all">
          <div className="text-4xl mb-2">🕸️</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Teia do Tempo</h2>
          <p className="text-gray-400">Capturando cada segundo</p>
        </div>

        <div 
          className="bg-gray-800 shadow-xl border-2 border-red-700 rounded-lg p-6 text-center hover:border-red-500 transition-all cursor-pointer"
          onClick={() => setShowSpider(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setShowSpider(true)}
        >
          <div className="text-4xl mb-2">⚡</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Sentido Aranha</h2>
          <p className="text-gray-400">Sempre no horário certo</p>
        </div>

        <div className="bg-gray-800 shadow-xl border-2 border-red-700 rounded-lg p-6 text-center hover:border-red-500 transition-all">
          <div className="text-4xl mb-2">🌍</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Localização</h2>
          <p className="text-gray-400">Sincronizado com GPS</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p className="text-sm">
          Desenvolvido com <span className="text-red-600 animate-pulse">❤️</span> e poderes aracnídeos
        </p>
        {/* Botão de Jumpscare */}
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg"
            onClick={() => setShowJumpscare(true)}
          >
            Apertar para Jumpscare
          </button>
        </div>
      </footer>

      {showJumpscare && (
        <Jumpscare
          duration={1800}
          onClose={() => setShowJumpscare(false)}
        />
      )}

      {showSpider && (
        <SpiderWalking
          duration={5000}
          onFinish={() => setShowSpider(false)}
        />
      )}
    </div>
  );
}

export default App;
