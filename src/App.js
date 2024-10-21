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

  const handleInputChange = (e, functionName) => {
    setInputs({ ...inputs, [functionName]: e.target.value });
  };

  const handleSubmit = (functionName) => {
    let result;
    try {
      switch (functionName) {
        case 'contractIdFromAddress':
          result = contractIdFromAddress(inputs[functionName]);
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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Alephium Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functions.map((func) => (
            <div key={func} className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{func}</h2>
              <input
                type="text"
                value={inputs[func] || ''}
                onChange={(e) => handleInputChange(e, func)}
                placeholder={`Enter parameters for ${func}`}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
              />
              <button 
                onClick={() => handleSubmit(func)}
                className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-300 mb-2"
              >
                Execute
              </button>
              {results[func] !== undefined && (
                <button 
                  onClick={() => toggleResult(func)}
                  className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  {showResults[func] ? 'Hide Result' : 'Show Result'}
                </button>
              )}
              {showResults[func] && results[func] !== undefined && (
                <p className="mt-4 text-sm break-words">
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
