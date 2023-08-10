import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import RBTree "mo:base/RBTree";

actor {
  var question: Text = "What is your favorite programming language?";
  // https://github.com/dfinity/motoko-base/blob/master/src/RBTree.mo
  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare); // key compare by text

  public query func getQuestion(): async Text{
    return question;
  };

  // query the list of entries and votes for each one
  public query func getVotes(): async [(Text, Nat)]{
    Iter.toArray(votes.entries())
  };

 
  public func vote(key: Text): async [(Text, Nat)]{
    let count :Nat = switch (votes.get(key)){
      case null 0;
      case (?Nat) Nat;
    };

    votes.put(key, count+1);
    Iter.toArray(votes.entries())
  };

  public func resetVotes(): async [(Text, Nat)]{
    // votes = RBTree.RBTree(Text.compare);
    for (entry in votes.entries()) {
      votes.delete(entry.0);
    };
      
    Iter.toArray(votes.entries());
  }; 
};