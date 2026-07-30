// 🏸 空間羽航員 V5.6 Final
// 公平輪轉排場核心

function createSchedule(players, courts) {
  let result = [];

  for (let i = 0; i < players.length; i++) {
    result.push({
      court: (i % courts) + 1,
      player: players[i]
    });
  }

  return result;
}
