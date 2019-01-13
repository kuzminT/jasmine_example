'use strict';
import Player from '../lib/jasmine_examples/Player';
import Song from '../lib/jasmine_examples/Song';

describe("Player", () => {
    let player;
    let song;

    beforeEach(function () {
        player = new Player();
        song = new Song();
    });

    it("should be able to play a Song", () => {
        player.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);

        //demonstrates use of custom matcher
        expect(player.isPlaying).toBeTruthy();
    });

    describe("when song has been paused", () => {
        beforeEach(() => {
            player.play(song);
            player.pause();
        });

        it("should indicate that the song is currently paused", () => {
            expect(player.isPlaying).toBeFalsy();
        });

        it("should be possible to resume", function () {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function () {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function () {
        it("should throw an exception if song is already playing", function () {
            player.play(song);

            expect(function () {
                player.resume();
            }).toThrowError("song is already playing");
        });
    });
});
