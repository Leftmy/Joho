export const DEFAULT_CODE_SNIPPETS: Record<string, string> = {
  csharp: `public class OrderService
{
    private readonly ApplicationDbContext _dbContext;

    public OrderService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Bug 1: Sync-over-async blocking call causing thread pool starvation
    public OrderDto GetOrderDetails(int orderId)
    {
        var order = _dbContext.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == orderId)
            .Result; // .Result blocks looper thread

        // Bug 2: Potential NullReferenceException if order is missing
        return new OrderDto
        {
            Id = order.Id,
            TotalAmount = order.Items.Sum(i => i.Price * i.Quantity)
        };
    }
}`,

  typescript: `interface UserSession {
  id: string;
  token: string;
  role: 'admin' | 'user';
}

export async function authenticateUser(email: string): Promise<UserSession | null> {
  try {
    const response = await fetch('/api/Auth/session', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    // Bug 1: Missing response.ok status validation before parsing JSON
    const data = await response.json();

    // Bug 2: Insecure unsafe type assertion without runtime schema validation
    return data as UserSession;
  } catch (error) {
    // Bug 3: Swallowing errors silently without logging or re-throwing
    return null;
  }
}`,

  python: `import sqlite3
import requests

class ReportGenerator:
    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)

    def fetch_user_report(self, user_input_id: str) -> dict:
        cursor = self.conn.cursor()
        
        # Bug 1: Critical SQL Injection vulnerability (string formatting in raw SQL)
        query = f"SELECT * FROM users WHERE user_id = '{user_input_id}' AND is_active = 1"
        cursor.execute(query)
        record = cursor.fetchone()
        
        # Bug 2: Unhandled HTTP request timeout and missing status code check
        res = requests.get(f"https://api.analytics.internal/data/{user_input_id}")
        analytics = res.json()
        
        return {"db_record": record, "analytics": analytics}
`,

  go: `package main

import (
	"encoding/json"
	"net/http"
	"sync"
)

type Counter struct {
	value int
}

var globalCounter Counter

func IncrementHandler(w http.ResponseWriter, r *http.Request) {
	// Bug 1: Race condition - concurrent access to shared state without Mutex lock
	globalCounter.value++

	// Bug 2: Missing Content-Type header and HTTP status code validation
	response := map[string]int{"count": globalCounter.value}
	json.NewEncoder(w).Encode(response)
}
`,

  rust: `use std::fs::File;
use std::io::{self, Read};

pub struct MemoryCache {
    buffer: Vec<u8>,
}

impl MemoryCache {
    pub fn load_file_into_cache(&mut self, path: &str) -> Result<usize, io::Error> {
        // Bug 1: Unbuffered file read loading entire file into memory at once
        let mut file = File::open(path)?;
        let bytes_read = file.read_to_end(&mut self.buffer)?;
        
        // Bug 2: Unsafe direct index access without bounds checking
        let _first_byte = self.buffer[1024];
        
        Ok(bytes_read)
    }
}
`,

  java: `public class ConnectionPoolManager {
    private static List<Connection> activeConnections = new ArrayList<>();

    // Bug 1: Thread safety violation - non-thread-safe ArrayList modified in multi-threaded environment
    public void registerConnection(Connection conn) {
        if (conn != null) {
            activeConnections.add(conn);
        }
    }

    // Bug 2: Resource leak - Statement and ResultSet not closed in finally block
    public void executeQuery(String sql) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/joho_db");
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        
        while (rs.next()) {
            System.out.println(rs.getString("username"));
        }
        // Missing rs.close(), stmt.close(), conn.close()
    }
}
`,

  cpp: `#include <iostream>
#include <cstring>

class StringWrapper {
private:
    char* data;
public:
    StringWrapper(const char* str) {
        // Bug 1: Buffer overflow risk with raw strcpy without size check
        data = new char[strlen(str) + 1];
        strcpy(data, str);
    }

    // Bug 2: Missing destructor causing severe memory leak
    // ~StringWrapper() { delete[] data; }

    void print() const {
        std::cout << data << std::endl;
    }
};
`,

  sql: `-- Bug 1: Unindexed full table scan on large text column with leading wildcard
SELECT 
    u.id, 
    u.username, 
    u.email, 
    COUNT(r.id) AS total_reviews
FROM users u
LEFT JOIN reviews r ON u.id = r.user_id
WHERE u.email LIKE '%@gmail.com'
GROUP BY u.id, u.username, u.email
HAVING COUNT(r.id) >= 1
ORDER BY total_reviews DESC;
`,
};
