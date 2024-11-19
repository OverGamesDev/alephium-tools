import React, { useState } from 'react';
import {
  contractIdFromAddress, addressFromContractId, 
  isValidAddress, addressFromTokenId, tokenIdFromAddress,
  convertAlphAmountWithDecimals, convertAmountWithDecimals, 
  stringToHex, hexToBinUnsafe, hexToString,
  base58ToBytes, number256ToBigint, number256ToNumber, 
  contractIdFromTx
} from '@alephium/web3';

function App() {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleInputChange = (e, functionName) => {
    setInputs({ ...inputs, [functionName]: e.target.value });
  };

  const handleSubmit = (functionName) => {
    let result;
    try {
      switch (functionName) {
        case 'contractIdFromAddress':
          const u8int = contractIdFromAddress(inputs[functionName]);
          const hexString = Array.from(u8int, byte => byte.toString(16).padStart(2, '0')).join('');
          result = hexString;
          break;
        case 'addressFromContractId':
          result = addressFromContractId(inputs[functionName]);
          break;
        case 'isValidAddress':
          result = isValidAddress(inputs[functionName]);
          break;
        case 'addressFromTokenId':
          result = addressFromTokenId(inputs[functionName]);
          break;
        case 'tokenIdFromAddress':
          result = tokenIdFromAddress(inputs[functionName]);
          break;
        case 'convertAlphAmountWithDecimals':
          result = convertAlphAmountWithDecimals(inputs[functionName]);
          break;
        case 'convertAmountWithDecimals':
          result = convertAmountWithDecimals(inputs[functionName]);
          break;
        case 'stringToHex':
          result = stringToHex(inputs[functionName]);
          break;
        case 'hexToBinUnsafe':
          result = hexToBinUnsafe(inputs[functionName]);
          break;
        case 'hexToString':
          result = hexToString(inputs[functionName]);
          break;
        case 'base58ToBytes':
          result = base58ToBytes(inputs[functionName]);
          break;
        case 'number256ToBigint':
          result = number256ToBigint(inputs[functionName]);
          break;
        case 'number256ToNumber':
          result = number256ToNumber(inputs[functionName]);
          break;
        case 'contractIdFromTx':
          result = contractIdFromTx(inputs[functionName]);
          break;
        default:
          result = 'Function not implemented';
      }
    } catch (error) {
      result = `Error: ${error.message}`;
    }
    setResults({ ...results, [functionName]: result });
    setShowResults({ ...showResults, [functionName]: true });
  };

  const toggleResult = (functionName) => {
    setShowResults({ ...showResults, [functionName]: !showResults[functionName] });
  };

  const functions = [
    'contractIdFromAddress', 'addressFromContractId', 'isValidAddress', 
    'addressFromTokenId', 'tokenIdFromAddress',
    'contractIdFromTx',
    'convertAlphAmountWithDecimals', 'convertAmountWithDecimals',
    'stringToHex', 'hexToBinUnsafe', 'hexToString',
    'base58ToBytes', 'number256ToBigint', 'number256ToNumber'
  ];

  const lightTheme = {
    bg: 'bg-[#e0e5ec]',
    text: 'text-gray-700',
    title: 'text-gray-800',
    shadow: 'shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]',
    insetShadow: 'shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff]',
  };

  const darkTheme = {
    bg: 'bg-[#1a1b1e]',
    text: 'text-gray-300',
    title: 'text-gray-100',
    shadow: 'shadow-[5px_5px_10px_#0f1012,-5px_-5px_10px_#25262a]',
    insetShadow: 'shadow-[inset_5px_5px_10px_#0f1012,inset_-5px_-5px_10px_#25262a]',
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className={`text-3xl font-bold ${theme.title} 
            ${theme.shadow}
            px-8 py-4 rounded-xl`}>
            Alephium Tools
          </h1>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-xl ${theme.shadow} 
              hover:${theme.insetShadow} transition-all duration-300`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {functions.map((func) => (
            <div key={func} className={`rounded-2xl p-6 ${theme.bg} ${theme.shadow}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme.title}`}>{func}</h2>
              <input
                type="text"
                value={inputs[func] || ''}
                onChange={(e) => handleInputChange(e, func)}
                placeholder={`Enter parameters for ${func}`}
                className={`w-full px-4 py-3 rounded-xl mb-4
                  ${theme.bg} ${theme.insetShadow} ${theme.text}
                  border-none focus:outline-none`}
              />
              <button 
                onClick={() => handleSubmit(func)}
                className={`w-full py-3 px-4 rounded-xl mb-3
                  ${theme.bg} ${theme.text} font-medium
                  ${theme.shadow}
                  hover:${theme.insetShadow}
                  transition-all duration-300`}
              >
                Execute
              </button>
              {results[func] !== undefined && (
                <button 
                  onClick={() => toggleResult(func)}
                  className={`w-full py-3 px-4 rounded-xl
                    ${theme.bg} ${theme.text} font-medium
                    ${theme.shadow}
                    hover:${theme.insetShadow}
                    transition-all duration-300`}
                >
                  {showResults[func] ? 'Hide Result' : 'Show Result'}
                </button>
              )}
              {showResults[func] && results[func] !== undefined && (
                <p className={`mt-4 text-sm break-words p-4 rounded-xl
                  ${theme.insetShadow}`}>
                  {typeof results[func] === 'object' ? JSON.stringify(results[func], null, 2) : results[func].toString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
