import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Games = new Mongo.Collection('games');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}
 

Meteor.methods({
  'games.insert'(users, usernames) {
    check(users, Array);
    check(usernames, Array);
 
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    return Games.insert({
      createdAt: new Date(),
      users: [Meteor.userId()],
      usernames: [Meteor.user().username],
      partner: "",
      score: 0,
      snake: [],
      dir: "right",
      gameOver: false
    });
  },
  'games.updateUsers'(gameId, newUsers, newUsernames) {
    check(gameId, String);
    check(newUsers, Array);
    check(newUsernames, Array);

    Games.update(gameId, {
      $set: { users: newUsers,
          usernames: newUsernames
      },
    });
  },
  'games.updateGameOver'(gameId, setChecked) {
    check(gameId, String);
    check(setChecked, Boolean);
 
    Games.update(gameId, { $set: { gameOver: setChecked } });
  },
  'games.updateDir'(gameId, newDir) {
    check(gameId, String);
    check(newDir, String);
 
    Games.update(gameId, { $set: { dir: newDir } });
  },
  'games.updateSnake'(gameId, newSnake) {
    check(gameId, String);
    check(newSnake, Array);
 
    Games.update(gameId, { $set: { snake: newSnake } });
  },
  'games.updateFood'(gameId, newFood) {
    check(gameId, String);
    check(newFood, Object);
 
    Games.update(gameId, { $set: { food: newFood } });
  },
  'games.updateScore'(gameId, newScore) {
    check(gameId, String);
    check(newScore, Number);
 
    Games.update(gameId, { $set: { score: newScore } });
  },
});