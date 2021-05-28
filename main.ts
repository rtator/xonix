function setupLevel () {
    // fill the whole map with 0
    bg.fill(0)
    for (let y7 = 0; y7 <= map_height - 1; y7++) {
        map[y7] = []
        for(let x7 = map_width - 1; x7 >= 0; --x7)
            map[y7][x7] = MAP_CELL_EMPTY
make_road(0, y7)
        make_road(1, y7)
        make_road(map_width - 1, y7)
        make_road(map_width - 2, y7)
    }
    for (let x8 = 0; x8 <= map_width - 1; x8++) {
        make_road(x8, 0)
        make_road(x8, 1)
        make_road(x8, map_height - 1)
        make_road(x8, map_height - 2)
    }
    player_x = player_y = 1
setPlayerPos()
    enemies.forEach(function(enemy: Enemy, index: number) {
        enemy.randomize() })
enemies.push(new Enemy1)
    if (level % 2 == 1) {
        enemies.push(new Enemy2)
    }
    game_speed = Math.max(50, 80 - level * 3)
    info.changeLifeBy(1)
    immunity = 20
}
function kill () {
    making_path = false
    music.pewPew.play()
    player_x = player_saved_x
    player_y = player_saved_y
    setPlayerPos()
    for(let y6 = 2; y6 < map_height - 2; ++y6)
        for(let x6 = 2; x6 < map_width - 2; ++x6)
        {
            const cell2 = map[y6][x6]
            if(cell2 == MAP_CELL_PATH)
                make_empty(x6, y6)
        }
if (!(immunity)) {
        info.changeLifeBy(-1)
        immunity = 20
    }
}
function setPlayerPos () {
    cell3 = map[player_y][player_x]
    if (cell3 == MAP_CELL_EMPTY) {
        make_path(player_x, player_y)
    } else if (cell3 == MAP_CELL_ROAD) {
        if (making_path) {
            fill()
        }
        player_saved_x = player_x
        player_saved_y = player_y
    }
    player_sprite.setPosition((player_x + 0.5) * tile_size_c, (player_y + 0.5) * tile_size_c)
}
function make_path (x: number, y: number) {
    if (making_path) {
        path_length += 1
    } else {
        making_path = true
        path_length = 1
    }
    map[y][x] = MAP_CELL_PATH
    xs3 = x * tile_size_c
    ys3 = y * tile_size_c
    bg.fillRect(xs3, ys3, tile_size_c, tile_size_c, PATH_COLOR)
}
function propagate_mark (x: number, y: number) {
    cond = (map[y - 1][x] & MAP_CELL_MARK) || (map[y + 1][x] & MAP_CELL_MARK) || (map[y][x - 1] & MAP_CELL_MARK) || (map[y][x + 1] & MAP_CELL_MARK)
    if (cond) {
        map[y][x] |= MAP_CELL_MARK
    }
    return cond
}
function fill () {
    making_path = false
    for(let y = 2; y <= map_height_m3; ++y)
        for(let x = 2; x <= map_width_m3; ++x)
        {
            const cell = map[y][x]
            if(cell == MAP_CELL_PATH)
                make_road(x, y)
        }
enemies.forEach(function(enemy: Enemy, index: number) {
        enemy.mark() })
let change:boolean
do
    {
        change = false
        for(let y2 = 2; y2 <= map_height_m3; ++y2)
            for(let x2 = 2; x2 <= map_width_m3; ++x2)
                if(map[y2][x2] == MAP_CELL_EMPTY && propagate_mark(x2, y2))
                    change = true
        for(let y3 = map_height_m3; y3 >= 2; --y3)
            for(let x3 = map_width_m3; x3 >= 2; --x3)
                if(map[y3][x3] == MAP_CELL_EMPTY && propagate_mark(x3, y3))
                    change = true
    }
    while(change)
for(let y4 = 2; y4 <= map_height_m3; ++y4)
        for(let x4 = 2; x4 <= map_width_m3; ++x4)
        {
            if(map[y4][x4] == MAP_CELL_EMPTY)
                make_road(x4, y4)
            else
                map[y4][x4] &= ~MAP_CELL_MARK
        }
for(let y5 = 2; y5 <= map_height_m3; ++y5)
        for(let x5 = 2; x5 <= map_width_m3; ++x5)
        {
            if(map[y5][x5] == MAP_CELL_EMPTY)
                ++empty
        }
if (empty < map_width * map_height / 5) {
        level += 1
        lives += 1
        music.magicWand.play()
        setupLevel()
    } else {
        music.powerUp.play()
    }
}
function make_empty (x: number, y: number) {
    let EMPTY_COLOR = 0
    map[y][x] = MAP_CELL_EMPTY
    xs = x * tile_size_c
    ys = y * tile_size_c
    bg.fillRect(xs, ys, tile_size_c, tile_size_c, EMPTY_COLOR)
}
function make_road (x: number, y: number) {
    map[y][x] = MAP_CELL_ROAD
    xs2 = x * tile_size_c
    ys2 = y * tile_size_c
    bg.fillRect(xs2, ys2, tile_size_c, tile_size_c, ROAD_COLOR)
}
let ny3 = 0
let nx3 = 0
let dx = 0
let dy = 0
let ys2 = 0
let xs2 = 0
let ys = 0
let xs = 0
let cond = false
let ys3 = 0
let xs3 = 0
let cell3 = 0
let level = 0
let player_sprite: Sprite = null
let MAP_CELL_PATH = 0
let MAP_CELL_ROAD = 0
let ROAD_COLOR = 0
let PATH_COLOR = 0
let map_width = 0
let map_height = 0
let tile_size_c = 0
let bg: Image = null
let enemies:Enemy[] = []
let map: number[][] = []
let MAP_CELL_EMPTY = 0
let empty = 0
bg = scene.backgroundImage()
let width = scene.screenWidth()
let height = scene.screenHeight()
tile_size_c = 4
map_height = Math.floor(height / tile_size_c)
map_width = Math.floor(width / tile_size_c)
let map_height_m3 = map_height - 3
let map_width_m3 = map_width - 3
PATH_COLOR = 2
ROAD_COLOR = 6
MAP_CELL_ROAD = 1
MAP_CELL_PATH = 2
let MAP_CELL_MARK = 4
let playerImages = [img`
    . 5 5 . 
    5 6 6 5 
    5 5 6 5 
    . 5 5 . 
    `, img`
    . 5 5 . 
    5 5 6 5 
    5 6 6 5 
    . 5 5 . 
    `, img`
    . 5 5 . 
    5 6 5 5 
    5 6 6 5 
    . 5 5 . 
    `, img`
    . 5 5 . 
    5 6 6 5 
    5 6 5 5 
    . 5 5 . 
    `]
let enemy1Images = [img`
    . d . . 
    . d d . 
    . d d . 
    . . d . 
    `, img`
    . . d . 
    . d d . 
    . d d . 
    . d . . 
    `, img`
    . . . . 
    . d d d 
    d d d . 
    . . . . 
    `, img`
    . . . . 
    d d d . 
    . d d d 
    . . . . 
    `]
let enemy2Images = [img`
    8 . 8 8 
    8 2 2 . 
    . 2 2 8 
    8 8 . 8 
    `, img`
    . 8 8 . 
    8 2 2 8 
    8 2 2 8 
    . 8 8 . 
    `, img`
    8 8 . 8 
    . 2 2 8 
    8 2 2 . 
    8 . 8 8 
    `, img`
    . 8 8 . 
    8 2 2 8 
    8 2 2 8 
    . 8 8 . 
    `]
let player_anim = animation.createAnimation(0, 100)
playerImages.forEach(p => player_anim.addAnimationFrame(p))
let enemy1_anim = animation.createAnimation(0, 50)
enemy1Images.forEach(p => enemy1_anim.addAnimationFrame(p))
let enemy2_anim = animation.createAnimation(0, 50)
enemy2Images.forEach(p => enemy2_anim.addAnimationFrame(p))
player_sprite = sprites.create(playerImages[0], 0)
animation.attachAnimation(player_sprite, player_anim)
animation.setAction(player_sprite, 0)
info.setLifeImage( img`
        . . . .
        . 5 5 .
        5 6 6 5
        5 5 6 5
        . 5 5 .
        . . . .
    `)
info.setBackgroundColor(16)
info.setBorderColor(1)
info.setFontColor(1)
let player_x:number
let player_y:number
let player_saved_x:number
let player_saved_y:number
let making_path:boolean
let path_length:number
// level config vars
let lives = 10
let immunity:number
let game_speed:number
class Enemy 
{
    x:number
    y:number
    vx:number
    vy:number
    sprite:Sprite
    randomize()
    {
        this.vx = randint(0, 2) > 0 ? 1 : -1
        this.vy = randint(0, 2) > 0 ? 1 : -1
    }
    constructor() {}
    collide() { return false }
    update()
    {
        if(this.collide())
            return
    
        this.sprite.setPosition((this.x + 0.5) * tile_size_c, (this.y + 0.5) * tile_size_c)
    }
    mark() {}
}
class Enemy1 extends Enemy 
{
    randomize()
    {   
        super.randomize() 
        this.x = randint(3, map_width_m3 - 1)
        this.y = randint(3, map_height_m3 - 1)
    }
    constructor()
    {
        super()
        this.randomize()
        this.sprite = sprites.create(enemy1Images[0])
        animation.attachAnimation(this.sprite, enemy1_anim)
        animation.setAction(this.sprite, 0)
    }
    collide() 
    {
        let collision = false
        const nx = this.x + this.vx
        if(map[this.y][nx] == MAP_CELL_ROAD)
        {
            this.vx = -this.vx
            collision = true
        }

        const ny = this.y + this.vy
        if(map[ny][this.x] == MAP_CELL_ROAD)
        {
            this.vy = -this.vy
            collision = true
        }

        if(!collision)
        {
            if(map[ny][nx] == MAP_CELL_ROAD)
            {
                this.vx = -this.vx
                this.vy = -this.vy
                collision = true
            }
            else
            {
                this.x = nx
                this.y = ny
            }
        }
        return collision
    }
    update() {
        super.update()
        if(map[this.y][this.x] == MAP_CELL_PATH)
            kill()
    }
    mark() {
        map[this.y][this.x] |= MAP_CELL_MARK
    }
}
class Enemy2 extends Enemy 
{
    randomize()
    {   
        super.randomize() 
        this.x = randint(map_width_m3 + 1, map_width - 1)
        this.y = randint(3, map_height_m3 - 1)
    }
    constructor()
    {
        super()
        this.randomize()
        this.sprite = sprites.create(enemy2Images[0])
        animation.attachAnimation(this.sprite, enemy2_anim)
        animation.setAction(this.sprite, 0)
    }
    collide() 
    {
        let collision2 = false
        const nx2 = this.x + this.vx
        if(nx2 < 0 || nx2 >= map_width || map[this.y][nx2] != MAP_CELL_ROAD)
        {
            this.vx = -this.vx
            collision2 = true
        }

        const ny2 = this.y + this.vy
        if(ny2 < 0 || ny2 >= map_height || map[ny2][this.x] != MAP_CELL_ROAD)
        {
            this.vy = -this.vy
            collision2 = true
        }

        if(!collision2)
        {
            if(map[ny2][nx2] != MAP_CELL_ROAD)
            {
                this.vx = -this.vx
                this.vy = -this.vy
                collision2 = true
            }
            else
            {
                this.x = nx2
                this.y = ny2
            }
        }
        return collision2
    }
    update() {
        super.update()
        if(!immunity && this.x == player_x && this.y == player_y)
            kill()
    }
}
enemies.push(new Enemy1)
setupLevel()
info.setLife(9)
game.onUpdateInterval(game_speed, function () {
    if (controller.down.isPressed()) {
        dy = 1
    } else if (controller.up.isPressed()) {
        dy = -1
    } else if (controller.right.isPressed()) {
        dx = 1
    } else if (controller.left.isPressed()) {
        dx = -1
    }
    if (dx != 0 || dy != 0) {
        nx3 = player_x + dx
        ny3 = player_y + dy
        if (nx3 >= 0 && nx3 < map_width && ny3 >= 0 && ny3 < map_height && map[ny3][nx3] != MAP_CELL_PATH && (path_length > 1 || (nx3 != player_saved_x || ny3 != player_saved_y))) {
            player_x = nx3
            player_y = ny3
            setPlayerPos()
        }
    }
    enemies.forEach(function(enemy: Enemy, index: number) {
        enemy.update()})
if (immunity) {
        info.showLife((--immunity & 1) != 0)
    }
})
