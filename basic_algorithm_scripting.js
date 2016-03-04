// All solutions are written by me and can be reused freely by anyone.

// Reverse the provided string.
// Your result must be a string.
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Return the factorial of the provided integer.
// If the integer is represented with the letter n, a factorial is
// the product of all positive integers less than or equal to n.
// Factorials are often represented with the shorthand notation n!
// For example: 5! = 1 * 2 * 3 * 4 * 5 = 120
function factorialize(num) {
  var sum = 1;
  for (var i = 1; i <= num; i++) {
    sum *= i;
  }
  return sum;
}

// Return true if the given string is a palindrome. Otherwise, return false.
// A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
function palindrome(str) {
  var rev = str.replace(/\W|_/g, '').toLowerCase().split('').reverse().join('');
  str = str.replace(/\W|_/g, '').toLowerCase();
  return rev == str;
}

// Return the length of the longest word in the provided sentence.
// Your response should be a number.
function findLongestWord(str) {
  var max = 0;
  var strArray = str.split(' ');

  for (var i = 0; i < strArray.length; i++) {
    if (strArray[i].length > max) {
      max = strArray[i].length;
    }
  }

  return max;
}

//Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.
// For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".
function titleCase(str) {
  return str.split(' ').map(function(w){
      return w.slice(0,1).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
}

// Return an array consisting of the largest number from each provided sub-array. For simplicity, the provided array will contain exactly 4 sub-arrays.
function largestOfFour(arr) {
  return arr.map(function(currentArray){
      return currentArray.reduce(function(max,c){
          if (c > max) { return c; }
          return max;
      });
  });
}

// Check if a string (first argument, str) ends with the given target string (second argument, target).
function end(str, target) {
  return str.slice(str.length-target.length) == target;
}

// Repeat a given string (first argument) num times (second argument). Return an empty string if num is a negative number.
function repeat(str, num) {
    if (num > 0) { return str.repeat(num); }
    return '';
}

// Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a "..." ending.
// Note that the three dots at the end add to the string length.
// If the num is less than or equal to 3, then the length of the three dots is not added to the string length.
function truncate(str, num) {
  if (str.length > num && num > 3) {
    str = str.slice(0,num - 3) + "...";
  } else if (str.length > num && num <= 3) {
    str = str.slice(0,num) + "...";
  }
  return str;
}

// Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.
function chunk(arr, size) {
  var bigArr = [];

  while (arr.length > size) {
    bigArr.push(arr.slice(0,size));
    arr = arr.slice(size);
  }
  bigArr.push(arr);

  return bigArr;
}

// Return the remaining elements of an array after chopping off n elements from the head.
// The head means the beginning of the array, or the zeroth index.
function slasher(arr, howMany) {
  arr.splice(0,howMany);
  return arr;
}

// Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.
// For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.
// The arguments ["hello", "hey"] should return false because the string "hello" does not contain a "y".
// Lastly, ["Alien", "line"], should return true because all of the letters in "line" are present in "Alien".
function mutation(arr) {
  var fst = arr[0].toLowerCase().split('');
  var snd = arr[1].toLowerCase().split('');

  return snd.reduce(function(m,c){
      if (fst.indexOf(c) === -1) {
        return false;
      }
      return m;
  },true);
}

// Remove all falsy values from an array.
function bouncer(arr) {
  return arr.reduce(function(a,c){
      if (!c) { return a; }
      a.push(c);
      return a;
  },[]);
}

// You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.
function destroyer(arr) {

  var elemsToDestroy = [];
  for(var i = 1; i < arguments.length; i++){
    elemsToDestroy.push(arguments[i]);
  }

  var survived = arguments[0].filter(function(element){
    var toReturn = true;

    for(var i = 0; i < elemsToDestroy.length; i++){
      if (element === elemsToDestroy[i]){
        toReturn = false;
      }
    }
    return toReturn;

  });
  return survived;
}

// Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted.
// For example, where([1,2,3,4], 1.5) should return 1 because it is greater than 1 (index 0), but less than 2 (index 1).
// Likewise, where([20,3,5], 19) should return 2 because once the array has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2) and greater than 5 (index 1).
function where(arr, num) {
  var sortedArray = arr.sort(function (a, b) {return a - b;});

  var i = 0;
  while (sortedArray[i] < num) {
    i++;
  }

  return i;
}

// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.
// A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
// Write a function which takes a ROT13 encoded string as input and returns a decoded string.
// All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
function rot13(str) { // LBH QVQ VG!
  var fst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var snd = 'NOPQRSTUVWXYZABCDEFGHIJKLM';

  return str.split('').map(function(c){
      if (c.match(/[A-Z]/g)) {
          return snd[fst.indexOf(c)];
      }
      return c;
  }).join('');
}